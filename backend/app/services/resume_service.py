import os
import tempfile

from fastapi import UploadFile

from app.prompts.resume_prompt import ResumePrompt
from app.services.gemini_service import GeminiService
from app.utils.pdf_parser import PDFParser


class ResumeService:

    @staticmethod
    async def analyze_resume(file: UploadFile):

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".pdf"
        ) as temp:

            temp.write(await file.read())

            temp_path = temp.name

        try:

            resume_text = PDFParser.extract_text(
                temp_path
            )

            prompt = ResumePrompt.build(
                resume_text
            )

            return GeminiService.generate_json(
                prompt
            )

        finally:

            if os.path.exists(temp_path):

                os.remove(temp_path)