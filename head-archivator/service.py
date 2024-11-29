from repository import DatabaseHandler
from db_config import DBConfig

def GetTable(table_name):
    db_handler = DatabaseHandler()
    db_handler.connect(DBConfig.DB_SETTINGS)
    
    table_document = db_handler.process_table(table_name, DBConfig.CONFIG)

    db_handler.close_connection()
    
    return table_document;

def GetArchive():
    db_handler = DatabaseHandler()
    db_handler.connect(DBConfig.DB_SETTINGS)
    
    archive = db_handler.process_archive(DBConfig.CONFIG)

    db_handler.close_connection()
    
    return archive;


GetTable("пользователи")