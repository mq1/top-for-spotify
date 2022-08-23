import { toPng, toBlob } from 'html-to-image';


const share = (id: string) => {
    const node = document.getElementById(id)!;

    if (!navigator.canShare) {
        toPng(node)
            .then((dataUrl) => {
                let link = document.createElement('a');
                link.download = `${id}.png`;
                link.href = dataUrl;
                link.click();
            })
            .catch((error) => {
                console.error('oops, something went wrong!', error);
            });
    } else {
        toBlob(node)
            .then((blob) => {
                // @ts-ignore
                const files = [new File([blob], `${id}.png`, { type: blob.type })];

                navigator.share({
                    files: files,
                    title: `My ${id}`,
                    text: `My ${id}`,
                });
            })
            .catch((error) => {
                console.error('oops, something went wrong!', error);
            });
    }
};

export default share;
