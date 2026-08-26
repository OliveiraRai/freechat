import sqlalchemy as sa
from sqlmodel import SQLModel, Field
from typing import Optional
from utils import generate_unique_code

# motivo de usar SQLModel é porque BaseModel não suporta table=True
class BaseUser(SQLModel):
    name: str = Field(unique=True)

# input; vai no corpo do post
class UserCreate(BaseUser):
    pass # geralmente é vazia e herda tudo da base

# saida; o que a api devolve pro frontend
class UserRead(BaseUser):
    id: int # id obrigatorio pois produto já existe

# modelo que vira tabela no sqlite
class User(BaseUser, table=True):
    # basicamente um codinome
    __tablename__ = "users"
    # sa.column=sa.Column... 'blinda' código contra bug de compatibilidade entre sqlmodel e pydantic
    id: Optional[int] = Field(default=None, sa_column=sa.Column(sa.Integer, primary_key=True))
    
class BaseChat(SQLModel):
    code: str = Field(max_length=8, default_factory=generate_unique_code, unique=True)
    host_id: int = Field(foreign_key="users.id")
    # ao criar um chat, ele já começa sem um guest, por isso Optional e default
    guest_id: Optional[int] = Field(default=None, foreign_key="users.id")
    
class ChatCreate(BaseChat):
    pass 

class ChatRead(BaseChat):
    id: int 

class Chat(BaseChat, table=True):
    __tablename__ = "chats"
    id: Optional[int] = Field(default=None, sa_column=sa.Column(sa.Integer, primary_key=True))
    
class Message(SQLModel, table=True):
    __tablename__ = "messages"
    
    id: Optional[int] = Field(default=None, sa_column=sa.Column(sa.Integer, primary_key=True))
    chat_id: int = Field(foreign_key="chats.id")
    sender_id: int = Field(foreign_key="users.id")
    text: str = Field(max_length=200)
    type: str
