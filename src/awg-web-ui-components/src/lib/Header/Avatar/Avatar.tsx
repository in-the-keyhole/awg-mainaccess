import Avatar, { AvatarProps } from '@mui/material/Avatar';

export type AwgAvatarProps = AvatarProps & {
    name?: string;
};

function stringToColor(string: string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
}

function stringAvatar(name?: string) {
    if (!name) {
        return '';
    }
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

export function AwgAvatar({ name, ...props }: AwgAvatarProps) {
    return <Avatar {...props} {...stringAvatar(name)} />;
}
