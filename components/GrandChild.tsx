import { ExampleContext } from '../contexts/album';

export const GrandChild = props => (
    <ExampleContext.Consumer>
        {({ data, hogeFunc, unchi }) => (
            <div>
                <input type="checkbox" onChange={hogeFunc} />
                <div>{data}</div>
                <div>{unchi.hoge}</div>
            </div>
        )}
    </ExampleContext.Consumer>
);
