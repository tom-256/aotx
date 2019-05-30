import { ExampleContext } from '../contexts/album';

export const GrandChild = props => (
    <ExampleContext.Consumer>
        {({ handleOnchange }) => (
            <div>
                <input type="checkbox" onChange={handleOnchange}/>
            </div>
        )}
    </ExampleContext.Consumer>
);
