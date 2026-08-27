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
@app.post('/user/create', response_model=models.UserRead, status_code=status.HTTP_201_CREATED)
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
@app.post('/chat/create', response_model=models.ChatRead, status_code=status.HTTP_201_CREATED)
def CreateChat(chat: models.ChatCreate, session: Session = Depends(get_session)):
    # verifica se o usuário existe
    db_user = session.get(models.User, chat.host_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found.")
    
    # valida se o usuário já possui um chat aberto
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

@app.post("/chat/join", response_model=models.ChatRead, status_code=status.HTTP_200_OK)
def ChatJoin(chat_data: models.ChatJoin, session: Session = Depends(get_session)):
    query = select(models.Chat).where(models.Chat.code == chat_data.code)
    chat = session.exec(query).first()
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found.")
    if chat.guest_id is not None:
        raise HTTPException(status_code=403, detail="Chat is already full or expired.")
    chat.guest_id = chat_data.guest_id
    session.add(chat)
    session.commit()
    session.refresh(chat)
    return chat

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)