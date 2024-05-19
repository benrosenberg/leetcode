# leetcode
Frontend for LeetCode submissions

## TODO

- [done] convert existing leetcode submissions json to new schema
- [done] put all languages on languages.html like tags.html
- [rejected - not necessary] put "about this site" link on problem.html
- [done] ~~add "populate from existing submission" button for problems already solved in another language on submit page~~ autopopulate from existing submissions on focus shift from number input field
- [done] add an "add solution" button for the existing problem pages
- [done] sort languages alphabetically in the column in index.html (and in the languages list in problem.html)
- [done] sort tags alphabetically in the column in index.html (and in the tags list in problem.html)
- [done] set overall date field for problem to minimum of existing dates and newly added date
- [done] fix issue with some code not displaying correctly in problem.html due to `<` and `>` signs being inserted as innerHTML rather than innerText - need to escape them correctly
- [done] make dropdown for language selection based on existing languages used across all problems (requires being able to add items not in dropdown)
- [done] make dropdown for tag selection based on existing tag used across all problems (requires being able to add items not in dropdown)
- [done] add data validation to number field in submit.html
- make it so that data is *not* cleared when putting in a number for a problem that does not exist yet
- fix tag dropdown to support adding multiple comma-separated entries rather than just one tag
- update small.json file on server to new schema (or just replace with data.json)
- allow Ctrl+clicks on links somehow - possibly switch to using href instead of using onClick actions for link html tags
- page to see stats over time and/or charts based on date, language, etc. in html5 canvas
  - pie chart of language usage
  - language usage over time
  - percentage of problems with each tag
  - problems solved over time
  - difficulty of problems solved over time
  - github-commit-history-like history of problem solutions (dark colors indicate low count, grey indicates no submissions, light color indicates many submissions - hovering pops up exact info)
- go back and redo a bunch of python solutions in rust as practice
- add creative commons license to main/personal site (benrosenberg.info)