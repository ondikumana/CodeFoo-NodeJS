--User_Account ID starts from 1000
CREATE SEQUENCE user_id_seq
    START 1000
    INCREMENT 1;

CREATE TABLE User_Account (
    user_id INT NOT NULL DEFAULT nextval('user_id_seq') PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--Session ID starts from 10000

CREATE SEQUENCE session_id_seq
    START 500
    INCREMENT 1;

CREATE TABLE Session (
    session_id INT NOT NULL DEFAULT nextval('session_id_seq') PRIMARY KEY,
    creator_id INT NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- This creates the relation between User_Account and sesssion

ALTER TABLE Session
    ADD FOREIGN KEY (creator_id) REFERENCES User_Account (user_id) ON DELETE CASCADE;

--Message ID starts from 10

-- CREATE SEQUENCE message_id_seq
--     START 10
--     INCREMENT 1;

--This function creates a notification regarding a newly created message in a specific session message table

CREATE FUNCTION notify_new_message ()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
BEGIN
    PERFORM
        pg_notify('newMessage', NEW);
    RETURN NULL;
END;
$$;

--This function creates a new table to store messages every time a session is created

CREATE FUNCTION create_session_messages_table ()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
DECLARE
    session_id VARCHAR := CAST(NEW.session_id AS VARCHAR);
    seq VARCHAR:= 'message_id_seq';
--My hope was to use the sequence to create a primary key for each table but I can't seem to get it to work with the Execute format
BEGIN
    EXECUTE format('
        CREATE TABLE %I (
 
            session_id INT NOT NULL,
            TYPE VARCHAR(100 ) NOT NULL,
            attachment VARCHAR(200 ),
            creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            sender_id INT NOT NULL,
            body VARCHAR(400 )
        )', session_id);
    
    --This creates the relation between User_Account and sesssion and message
    EXECUTE format('
     ALTER TABLE %I
         ADD FOREIGN KEY (sender_id) REFERENCES User_Account (user_id) ON DELETE CASCADE;
     ', session_id);
    EXECUTE format('
    ALTER TABLE %I
        ADD FOREIGN KEY (session_id) REFERENCES Session (session_id) ON DELETE CASCADE;
    ', session_id);

    --This trigger calls the notifyNewMessage after a message is created
    EXECUTE format('
    CREATE TRIGGER new_message_trigger
            AFTER INSERT ON %I
            FOR EACH ROW
            EXECUTE PROCEDURE notify_new_message ( );
    ', session_id);

    
    RETURN NULL;
END;
$$;

--This trigger calls the cresteSessionMessagesTable after a session is created

CREATE TRIGGER new_session
    AFTER INSERT ON Session
    FOR EACH ROW
    EXECUTE PROCEDURE create_session_messages_table ();

