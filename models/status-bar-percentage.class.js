function resolveImageIndex(percentage) {
    if (percentage > 80) {
        return 5;
    } else if (percentage > 60) {
        return 4;
    } else if (percentage > 40) {
        return 3;
    } else if (percentage > 20) {
        return 2;
    } else if (percentage > 0) {
        return 1;
    } else {
        return 0;
    }
}