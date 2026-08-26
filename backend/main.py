import models
from fastapi import FastAPI, Depends, status, HTTPException
from contextlib import asynccontextmanager
from database import create_db_and_tables, get_session, engine
from sqlalchemy.orm import Session 
from sqlalchemy import select

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    print("Database and tables created successfully!")
    yield
    print("Shutting down...")

app = FastAPI(lifespan=lifespan)

# creates user instance/object
@app.post('/create/user', response_model=models.UserRead, status_code=status.HTTP_201_CREATED)
def CreateUser(user: models.UserCreate, session: Session = Depends(get_session)):
    query = select(models.User).where(models.User.name == user.name)
    existing_user = session.exec(query).first() 
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="There is already a user with that name."
        )
    db_user = models.User.model_validate(user)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user

# creates chat instance/object
@app.post('/create/chat', response_model=models.ChatRead, status_code=status.HTTP_201_CREATED)
def CreateChat(chat: models.ChatCreate, session: Session = Depends(get_session)):
    # verifica se o usuário existe
    db_user = session.get(models.User, chat.host_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found.")
    
    # valida se o usuário JÁ POSSUI um chat aberto
    query = select(models.Chat).where(models.Chat.host_id == chat.host_id)
    existing_chat = session.exec(query).first() # busca o primeiro que encontrar
    
    if existing_chat:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="User already has a chat room."
        )
        
    # se passou, cria o chat
    db_chat = models.Chat.model_validate(chat)
    
    session.add(db_chat)
    session.commit()
    session.refresh(db_chat)
    
    return db_chat

# TODO rota join

# TODO rota chat (itself)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)