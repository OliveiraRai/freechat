from sqlmodel import Session, select
from database import engine
import random, string

def generate_unique_code():
    from models import Chat
    length = 6
    with Session(engine) as session:
        # pega todos códigos de chat
        statement = select(Chat.code)
        codes = session.exec(statement).all()
        while True:
            # cria novo código
            code = ''.join(random.choices(string.ascii_uppercase, k=length))
            # verifica se código criado já existe no banco de dados
            if code not in codes:
                # se não, quebra loop
                break
    # retorna código criado
    return code