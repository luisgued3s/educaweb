import { ProgressBar } from 'react-bootstrap';

export function PorcentagemCurso({ progress }) {
  return (
    <div>
      <ProgressBar
        variant="warning"
        max={100}
        now={progress}
        label={`${progress}%`}
      />
    </div>
  );
}
