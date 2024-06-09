BEGIN;

CREATE OR REPLACE FUNCTION update_updated_at_function()
RETURNS TRIGGER 
AS 
$$
BEGIN
  -- ASSUMES the table has a column named exactly "updated_at".
  -- Fetch date-time of actual current moment from clock, rather than start of statement or start of transaction.
  NEW.updated_at = clock_timestamp(); 
  RETURN NEW;
END;
$$ 
language 'plpgsql';

DO $$
BEGIN
  -- Check if the row_mod_on_category_trigger exists
  IF NOT EXISTS (
    SELECT 1 
    FROM pg_trigger 
    WHERE tgname = 'row_mod_on_category_trigger'
  ) THEN
    -- Create the trigger if it does not exist
    CREATE TRIGGER row_mod_on_category_trigger
    BEFORE UPDATE
    ON category 
    FOR EACH ROW 
    EXECUTE PROCEDURE update_updated_at_function();
  END IF;

  -- Check if the row_mod_on_item_trigger exists
  IF NOT EXISTS (
    SELECT 1 
    FROM pg_trigger 
    WHERE tgname = 'row_mod_on_item_trigger'
  ) THEN
    -- Create the trigger if it does not exist
    CREATE TRIGGER row_mod_on_item_trigger
    BEFORE UPDATE
    ON item
    FOR EACH ROW 
    EXECUTE PROCEDURE update_updated_at_function();
  END IF;
END $$;

COMMIT;

