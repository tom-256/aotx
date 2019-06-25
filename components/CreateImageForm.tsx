import { Album } from '../models/Album';
import { config } from '../lib/config';

type CreateImageFormProps = {
    selectedAlbums: Album[];
};
export const CreateImageForm: React.FunctionComponent<CreateImageFormProps> = (props: CreateImageFormProps) => {
    const onClick = async () => {
        console.log('button onsubmit')
        console.log(JSON.stringify(props.selectedAlbums))
        await fetch(`${config.server}/api/upload`, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(props.selectedAlbums)
        });
    };
    return (
        <button onClick={onClick} >creat image</button>
    );
};
