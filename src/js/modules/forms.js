import checkNumInputs from './checkNumInputs';

//FORMS

const forms = (state) => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input');


    checkNumInputs('input[name = "user_phone"]');

    const message = {
        loading: 'Loading...',
        seccess: 'Thank you! We’ll be in touch soon',
        failure: 'Something went wrong'
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await res.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);
            if (item.getAttribute('data-calc') === 'end') {

                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.seccess;
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);

                    setTimeout(() => {

                        document.querySelectorAll('[data-modal]').forEach(modal => {
                            modal.style.display = 'none';
                            document.body.style.overflow = "";
                        });

                    }, 7000);

                });
        });
    });

};

export default forms;