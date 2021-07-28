import { entityStr1 } from './entity'
let puzzles = [
  {
    id: 1,
    template: `function answerToLife(){\n\t//fill in below\n\treturn\n}`,
    header: 'Life, The Universe, and Everything',
    hint: `The Hitchhiker's Guide to the Galaxy`,
    userWritten: '',
  },
  {
    id: 2,
    template: `${entityStr1}`,
    header: `Death`,
    userWritten: '',
  }
]

export default puzzles;