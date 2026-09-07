# 1. Certifique-se de adicionar o import do StaticPool no topo do arquivo ou antes da engine
from sqlalchemy.pool import StaticPool
from sqlmodel import create_engine, Session, SQLModel

file_name = "freechat.db"
url = f"sqlite:///{file_name}"

engine = create_engine(
    url, 
    echo=True, 
    connect_args={"check_same_thread": False},
    poolclass=StaticPool
)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
    
def get_session():
    with Session(engine) as session:
        yield session
