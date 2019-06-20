import { Album } from '../models/Album';
import { config } from '../lib/config';

type CreateImageFormProps = {
    selectedAlbums: Album[];
};
export const CreateImageForm: React.FunctionComponent<CreateImageFormProps> = (props: CreateImageFormProps) => {
    const onClick = async () => {
        console.log('button onsubmit')
        await fetch(`${config.server}/api/upload`, {
            method: 'post',
            body: JSON.stringify(props.selectedAlbums),
            headers: { 'Content-Type': 'application/json' }
        });
    };
    return (
        <button onClick={onClick} >creat image</button>
    );
};
