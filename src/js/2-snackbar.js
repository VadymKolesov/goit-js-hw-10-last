import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('form'),
  btn: document.querySelector('button'),
  delayInput: document.querySelector('input[name="delay"]'),
  fieldset: document.querySelector('fieldset'),
};

let RADIO_VALUE;

refs.fieldset.addEventListener('change', saveRadioValue);
refs.form.addEventListener('submit', createPromise);

function createPromise(e) {
  let DELAY = refs.delayInput.value;
  e.preventDefault();
  refs.form.reset();
  return Promise[RADIO_VALUE]()
    .then(value =>
      setTimeout(() => {
        iziToast.success({
          message: `✅ Fulfilled promise in ${DELAY}ms`,
          position: 'topRight',
        });
      }, DELAY)
    )
    .catch(error =>
      setTimeout(() => {
        iziToast.error({
          message: `❌ Rejected promise in ${DELAY}ms`,
          position: 'topRight',
        });
      }, DELAY)
    );
}

function saveRadioValue(e) {
  if (e.target.value === 'fulfilled') {
    RADIO_VALUE = 'resolve';
  } else {
    RADIO_VALUE = 'reject';
  }
}
