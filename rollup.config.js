import typescript from 'rollup-plugin-typescript2';

export default [
  {
    input: './src/index.ts',

    plugins: [typescript()],

    output: [
      {
        file: 'dist/es/index.js',
        format: 'es',
      },
    ],
  },
  {
    input: './src/index.ts',

    plugins: [
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            target: 'es3',
          },
        },
      }),
    ],

    output: [
      {
        file: 'dist/cjs/index.js',
        format: 'cjs',
      },
    ],
  },
];
