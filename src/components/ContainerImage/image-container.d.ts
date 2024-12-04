interface ImageContainerProps {
    children?: React.ReactNode;
    noBorder?: boolean;
    noZoomedHover?: boolean;
}

interface ImageProps {
    src?: string;
    name?: string;
    provider?: string;
    selected?: boolean;
    onLoaded?: () => void;
    onError?: (e: any) => void;
    error?: boolean;
}