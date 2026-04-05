import { helper } from '@ember/component/helper';

export function colonCheck(params, hash) {
    let text = `${hash.text}`;
    if (text != null && text.length > 0) {
      if (text.indexOf(':') > -1) {
        return true;
      } else {
        return false;
      }
    }
}

export default helper(colonCheck);

