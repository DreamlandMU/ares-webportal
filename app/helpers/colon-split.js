import { helper } from '@ember/component/helper';
export function colonSplit(params, hash) {
    let text = `${hash.text}`;
    let part = `${hash.part}`;
    if (text != null && text.length > 0) {
      return text.split(': ')[part];
    } else {
      return string;
    }
}

export default helper(colonSplit);
