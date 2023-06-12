import { Dna } from 'react-loader-spinner';

// Loader
export function Loader() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
}
