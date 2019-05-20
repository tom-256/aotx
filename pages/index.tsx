import React from 'react'
import axios from 'axios'

export default class App extends React.Component<IProps> {
  async onChange(event: React.FormEvent<HTMLInputElement>) {
    console.log(event.target.value);
    const result = await axios.get(`http://localhost:3000/search?searchword=${event.target.value}`)
    console.log(result);
  }
    public render() {
        return (
            <ul>
                <input type="form" onChange={ e => this.onChange(e) } />
            </ul>
        )
    }
}
