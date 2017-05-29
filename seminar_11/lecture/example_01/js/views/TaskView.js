var TaskView = function (model) {
    this.model = model;
};

TaskView.prototype = {
    
    render: function (index) {
        var wrapper = document.createElement('div');
        wrapper.classList.add('field');
        if (this.model.getStatus()) {
            wrapper.classList.add('completed');
        }

        var label = document.createElement('label');
        label.classList.add('checkbox');

        var input = document.createElement('input');
        input.classList.add('task');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('data-index', index);
        input.checked = this.model.getSelected();
        label.appendChild(input);

        var name = document.createTextNode(this.model.getName());
        label.appendChild(name);

        wrapper.appendChild(label);

        return wrapper;
    }
};