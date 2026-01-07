from pydantic import BaseModel, Field
from typing import Optional, List


class ProjectCreateSchema(BaseModel):
    id: str = Field(..., description="Unique identifier for the project")

    test: str = Field(..., description="TTest key")
    name: str = Field(..., description="Name of the project")
    description: Optional[str] = Field(None, description="Description of the project")
    tags: List[str] = Field([], description="List of tags associated with the project")
    worked_days : int = Field(0, description="Number of days worked on the project")