export const TextWrapper = ({
    text,
    maxWidth = 'max-w-md',
    textSize = 'text-base',
    textColor = 'text-gray-800',
    lineHeight = 'leading-normal'
}: {
    text: string,
    maxWidth?: string,
    textSize?: string,
    textColor?: string,
    lineHeight?: string
}) => {
    return (
        <div className={`${maxWidth} ${textSize} ${textColor} ${lineHeight} break-words`}>
            {text}
        </div>
    );
};