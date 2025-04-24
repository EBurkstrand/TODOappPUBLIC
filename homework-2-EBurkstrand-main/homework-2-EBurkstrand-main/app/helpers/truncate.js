import { helper } from '@ember/component/helper';

export default helper(function truncate([text]) {
  if (text.length > 50) {
    return text.substring(0, 47) + '...';
  } else {
    return text;
  }
});
