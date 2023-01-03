const menuBackText = (prevText) => {
    console.clear()
    console.log(prevText)
    console.log('\n Type `r` to return: \n');
}


export const menuBack = (prevMenu, prevText) => {

    menuBackText(prevText);
    const stdinListener = (data) => {
        switch (data.toString()) {
            case 'r':
                process.stdin.off('data', stdinListener);
                prevMenu();
                break;
            default:
                menuBackText(prevText);
        }
    }
    process.stdin.on('data', stdinListener);
}