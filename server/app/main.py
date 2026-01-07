from fastapi import FastAPI
from fastapi.responses import JSONResponse
from .api_router import router as api_router
from app.config.config import Config

print(f"Starting application in {Config.ENVIRONMENT} mode. Debug={Config.DEBUG}")

app = FastAPI()


@app.get("/hello-world")
def name():
    return {"message": "Hello, World!"}


app.include_router(api_router)

@app.exception_handler(Exception )
async def global_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"message": "An unexpected error occurred.", "error": type(exc).__name__},
    )