const {AbstractModel} = require('./abstract-model');

const HEADING_REGEX = /^ *(#define [^\n=]+$|#enddef)|[^!\n]*!\${1,5}!.*|^!.!chapter +=*[^=\n]*|^ *.?prog +[^\n]*(?:\n *head +(.+))?|!.! +.*/i

const RE_LHEAD = [
  /([^!\n]*)!\${1}!(.*)/i,
  /([^!\n]*)!\${2}!(.*)/i,
  /([^!\n]*)!\${3}!(.*)/i,
  /([^!\n]*)!\${4}!(.*)/i,
  /([^!\n]*)!\${5}!(.*)/i,
  /^(!.!chapter) +=*([^=\n]*)/i,
  /^ *(.?prog +[^\n]*)(?:\n *head +(.+))?/i,
  /(!.! +.*)/,
]

class SofiModel extends AbstractModel {

  constructor(editor) {
    super(editor, HEADING_REGEX)
    this.defineCount = 0
  }

  parseResults(scanResult) {
    let level = 0;
    let label = '';
    let heading = scanResult[0];

    if (atom.config.get('navigation-pane.sofiDefine')===false) {
      if (/^ *#define [^\n=]+$/.exec(heading)) {
        this.defineCount++;
        return
      } else if ((/^ *#enddef/.exec(heading))) {
        this.defineCount--;
        return
      }
    } else if (/^ *(#define [^\n=]+$|#enddef)/.exec(heading)) {
      return
    }

    if (this.defineCount>0) {return}

    for (var regex of RE_LHEAD) {
      level += 1;
      if (level > this.maxDepth) {break}

      let subresult = regex.exec(heading)

      if (subresult) {

        if (level<=5) {
            label = subresult[1].trim() + ' ' + subresult[2].trim()
            let labre = /^[ =]*(.*?)[ =]*$/.exec(label)
            label = labre[1]

        } else if (level==6) {
          label = subresult[1] + ' ' + subresult[2]

        } else if (level==7) {
          let part1 = subresult[1].replace(/urs\:.+/, '').trim()
          if (subresult[2]) {
            label = part1 + ': ' + subresult[2]
          } else {
            label = part1
          }

        } else {
          label = subresult[1]
      }

      break
    }
  }
  return {level: level, label: label.trim()}};
}

module.exports = {SofiModel}
