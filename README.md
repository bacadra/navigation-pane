# navigation-pane

## Sections panel

Package offer custom panel to show navigation tree. The CSS can be customize.


## Highlight section

Section can be highlighted. The default is line background highlight, but in can change to border or any another by user styles.


## Section folding

There are function which provide fold, unfold or toggle sections following by the headers markers. The special future is to collapse all section to create view like table of content.


## Available scopes

### ASCII

Global regular expression is `/^(=={0,5}|#\#{0,5})[ \t]+(.+?)(?:[ \t]+\1)?$/`.


### LaTeX

Global regular expression is `/[^%\n]*%\${1,5}% .*|^[^\%\n]*(?:\\(?:part|chapter|section|frametitle|subsection|framesubtitle|subsubsection|paragraph|subparagraph)\*?)(?:\[.*\])?{([^}]*)/`. The `\part{...}` is equal level 6.

* e.g. `%$% Countries`
* e.g. `%$$% United Kingdom`
* e.g. `\part{Resources}`


### BibTeX

Global regular expression is `/[^%\n]*%\${1,5}% (.*)|^[ ]*\@(\w*)[ ]*{[ ]*([^\,]*)/`. The `@` lines has lowest priority equal 6.

* e.g. `%$% Bibliography about countries`
* e.g. `%$$% United Kingdom`
* e.g. `@book{jk2021, ...`


### Markdown

Global regular expression is `/^ *\#{1,5} (.*)/`. The level is defined as count of `#`.

* e.g. `# Countries`
* e.g. `## United Kingdom`


### Python

Global regular expression is `/^([^#\n]*)#(?:%%)?(\${1,9}[spv1]?|a)#(.*)/` where count of `$` mean the level on list and additional letter can be used to provide additional effect:

* `s`: get only text from first string which occur in this line,
* `p`: python def or class; show only type and name of object
* `v`: variable; show only name of variable
* `1`: use only first word (split by whitespace), without optional after-colon

As special case you can use `#a#` which mean auto level base on pattern:
`<any>(<lvl as int>, "<text>"<any>)`. It is useful e.g. in PyLaTex or similar.

* e.g. `#$# Countries`
* e.g. `#$$# United Kingdom`
* e.g. `a = 5 #$$v#`
* e.g. `class MyCounty(Country): #$$p#`
* e.g. `document.section(1, 'Countries') #a#`
* e.g. `document.section(2, 'United Kingdom') #a#`


### ReStructuredText

Global regular expression is `/^(.+)\n([!-/:-@[-[-~])\2+$/`.


### SOFiSTiK

Global regular expression is `/^ *(#define [^\n=]+$|#enddef)|[^!\n]*!\${1,5}!.*|^!.!chapter +=*[^=\n]*|^ *.?prog +[^\n]*(?:\n *head +(.+))?|!.! +.*/`.
