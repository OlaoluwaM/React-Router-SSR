import React from 'react';
import Grid from './Grid';

export default function App({ data }) {
  return (
    <div>
      <Grid repos={data} />
    </div>
  );
}
