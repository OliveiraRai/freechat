from sqlmodel import create_engine, Session, SQLModel

# pode mudar db facilmente depois
file_name = "freechat.db"
url = f"sqlite:///{file_name}"

engine = create_engine(url, echo=True, connect_args={"check_same_thread": False})

def create_db_and_tables():
    # cria arquivo db e suas tabelas
    SQLModel.metadata.create_all(engine)
    
def get_session():
    # injeta sessão nas rotas // sessão: basicamente uma chave de reconhecimento para navegação
    with Session(engine) as session:
        # yield sinonimos: produce, generate, provide, return
        yield session