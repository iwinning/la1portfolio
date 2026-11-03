# Andre's Portfolio

Course: DA558A

Target grade: Grade 3 (3-pointer)

A personal portfolio presenting Andre's background, interests, photographs and
projects. The original Lab 1 HTML and CSS design is preserved, with a JavaScript
feedback form added for Lab 2.

## Lab 2 feedback form

The Feedback page contains five fields:

- Name: required, at least 2 characters; supports international letters, spaces,
  apostrophes and hyphens.
- Email: required, with browser email validation and a dotted domain.
- Topic: a selection is required.
- Comments: at least 15 characters, with a live character counter.
- Website: optional; if entered, it must pass the browser's URL validation.

JavaScript checks fields when you leave them and rechecks checked fields as you
edit. The topic dropdown is also checked when its selection changes. Untouched
fields remain neutral. Invalid fields show red borders and written errors;
checked valid fields show green borders. Error messages are associated with their
fields for accessibility, and keyboard focus is visible.

Submit checks all five fields without reloading the page. If they pass, it shows
"Thanks for your feedback, [Full Name]!" and automatically resets the fields,
errors, validation states and counter. The success message stays visible for four
seconds. Invalid submissions keep the entered data.

Clear resets the form and removes any success message immediately. A previous
timer cannot remove a newer submission's message. The feedback form runs only in
the browser and does not send or store feedback on a server.

## View the portfolio

Open `index.html` in a web browser, then choose Feedback in the navigation.
Choose Home on the feedback page to return to the portfolio. No installation or
build step is required.

Alternatively, open the project in VS Code with the Live Server extension
installed. Right-click `index.html` and choose **Open with Live Server**.

## Test the feedback form

1. Open Feedback. Fields should initially have neutral borders and the comments
   counter should show 0 characters with a minimum of 15.
2. Leave required fields empty and press Submit. Check the written errors and red
   borders. Enter a name such as `André O'Connor`, an email such as
   `andre@example.com`, and choose a topic. Corrected fields should turn green.
3. Try invalid emails such as `a@b!.com` and `a@-example.com`; both should fail.
4. Enter 14 characters in Comments, then add one more. The counter should update
   immediately and turn green at 15. After leaving the field, its validation
   border should also reflect whether it passes.
5. Leave Website empty: it should be valid. Try `example.com`: it should fail.
   Try `https://example.com`: it should pass.
6. Submit valid values. Check the personalized message, automatic form reset and
   counter reset. The page should not reload, and the message should disappear
   after four seconds.
7. Submit again, then press Clear before four seconds pass. Everything, including
   the message, should clear immediately. Also try Clear with invalid values and
   an already-empty form.
8. Submit two valid entries less than four seconds apart. The second message
   should remain for its own four seconds.
9. Test Home and Feedback links, use Tab to check keyboard focus, and try narrow
   and wide browser windows. Check the browser developer console for errors.

## Project files

- `index.html`: portfolio content and contact form.
- `style.css`: desktop and mobile styles.
- `feedback.html`: Lab 2 feedback form and accessible error/status areas.
- `js/feedback.js`: validation, live counter, Submit, Clear, reset and message timer.
- `images/`: portfolio photographs.
- `README.md`: project overview, running instructions and manual tests.
- `.gitignore`: excludes common credentials, local files and generated output.

The original homepage contact form opens the visitor's email application through
a `mailto:` link. It is separate from the Lab 2 feedback form.

## Development

Keep the Lab 1 portfolio and design intact while completing future coursework.
Review `git status` and staged changes before committing. Keep passwords, API
keys, tokens, and private files out of the repository. `.gitignore` excludes
common local configuration, credential files, dependencies, and generated output.

The portfolio includes personal photographs and a contact email address.
Review these before making the repository public.
