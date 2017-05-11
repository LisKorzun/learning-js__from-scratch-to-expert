function DiaryDay() {
    var args = [].slice.call(arguments);
    this.dayNumber = args[0] || 1;
    this.tasks = [];
}
window.onload = function () {
    var day = new DiaryDay();
    
};
