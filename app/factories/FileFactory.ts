import { File, FileDTO } from 'app/models/File';

export class FileFactory {
    public static createFromDTO(dto: FileDTO): File {
        return new File(dto.key, dto.size);
    }
}
