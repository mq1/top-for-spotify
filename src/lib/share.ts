import html2canvas from "html2canvas";


const share = async (id: string) => {
    const canvas = await html2canvas(document.getElementById(id)!);
    const dataUrl = canvas.toBlob(async (blob) => {
        const files = [new File([blob!], 'image.png', { type: blob!.type })]
        const shareData = {
            files,
            title: `My ${id}`,
            text: `My ${id}`,
        }

        if (navigator.canShare(shareData)) {
            await navigator.share(shareData);
        } else {
            let link = document.createElement('a');
            link.download = `${id}.png`;
            link.href = canvas.toDataURL();
            link.click();
        }
    });
};

export default share;
