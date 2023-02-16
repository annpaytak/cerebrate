import { ChangeEvent, useState, FC } from "react";
import { Button, styled, TextField } from "@mui/material";

const FILE_NAMES_STORAGE_KEY = "fNames";

export const UploadFile: FC = () => {
  const [uploadFormat, setUploadFormat] = useState<"file" | "url" | null>(null);

  const [step, setStep] = useState<number>(0);

  const [errorMsg, setErrorMsg] = useState("");
  const [fileNames, setFileNames] = useState<string[]>(
    JSON.parse(localStorage.getItem(FILE_NAMES_STORAGE_KEY) || "[]") || []
  );

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];
    const MAX_FILE_SIZE = 20480; // 20MB
    const fileSizeKiloBytes = file.size / 1024;

    if (fileSizeKiloBytes > MAX_FILE_SIZE) {
      setErrorMsg("File size is greater than maximum limit");
      return;
    }

    if (fileNames.includes(file.name)) {
      setErrorMsg("File exists");
      return;
    }

    setErrorMsg("");

    const newNames = [...fileNames, file.name];
    setFileNames(newNames);

    localStorage.setItem(FILE_NAMES_STORAGE_KEY, JSON.stringify(newNames));
    setStep(2);
  };

  return (
    <>
      {step === 2 && (
        <Container>
          <Headline>My Documents</Headline>
          <Button variant="outlined">+ New</Button>
          {fileNames.length ? (
            fileNames.map((file) => (
              <UploadedFile key={file}>{file}</UploadedFile>
            ))
          ) : (
            <>
              <p>No files yet...</p>
              <p>Please upload some files to continue the work</p>
            </>
          )}
          <button
            onClick={(e) => {
              // go to 'Test your bot' tab
            }}
          >
            Submit
          </button>
        </Container>
      )}
      {uploadFormat === "url" && step === 1 && (
        <Container>
          <Headline>Upload from URL</Headline>
          <TextField type="text" name="" id="" placeholder="Name*" />
          <TextField type="text" name="" id="" placeholder="URL" />
          <Button
            variant="contained"
            onClick={() => {
              setStep(2);
            }}
          >
            submit
          </Button>
        </Container>
      )}
      {!step && (
        <UploadContainer>
          <Headline>Document Uploader</Headline>

          <label>
            <input
              hidden
              onChange={handleFileChange}
              multiple
              type="file"
              accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            />
            <UploadButton variant="contained" component="span">
              Upload from File
            </UploadButton>
          </label>

          <UploadButton
            onClick={() => {
              setStep(1);
              setUploadFormat("url");
            }}
          >
            Upload from URL
          </UploadButton>

          <UploadHint>
            {errorMsg ? errorMsg : "File type: pdf, word, txt (20MB max)"}
          </UploadHint>
        </UploadContainer>
      )}
    </>
  );
};

const UploadedFile = styled("div")(`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px;
  gap: 12px;

  width: 784px;
  height: 72px;

  background: #232F48;
  border-radius: 6px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;

  color: #CED9E9;
`);

const Container = styled("div")(`
  display: flex;
  flex-direction: column;
  padding: 0;

  width: 100%;
  height: 100%;
  min-height: 580px;

  background: #192337;
  border-radius: 8px;
`);

const UploadContainer = styled(Container)(`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto auto auto;
  justify-content: center;
  align-items: center;
  padding: 0;
  gap: 8px;
`);

const Headline = styled("h2")(`
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;

  padding-top: 36px;
  font-family: 'Aeonik Fono', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 24px;
  text-align: center;
  color: #CED9E9;
`);

const UploadButton = styled(Button)(`
  grid-row-start: 2;
  grid-row-end: 3;

  margin: 24px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 16px;
  gap: 24px;

  background: #232F48;
  border-radius: 6px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  text-transform: initial;
  color: #CED9E9;

  height: 102px;

  &:hover{
    background: #232F48;
    opacity: 0.9;
  }

  @media (min-width: 768px) {
    height: 344px;
  }

`) as typeof Button;

const UploadHint = styled("span")(`
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 3;
  grid-row-end: 4;
  align-self: end;
  box-sizing: border-box;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 16px;
  letter-spacing: 0.015em;
  padding: 6px 15px;

  color: #513985;

  width: 100%;

  background: #DCCAFF;
  border-radius: 0px 0px 8px 8px;
`);
