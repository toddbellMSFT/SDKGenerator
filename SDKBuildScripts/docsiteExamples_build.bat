pushd ..
if [%1] == [] (
rem === BUILDING DocsiteExamples ===
node generate.js DocsiteExamples=..\API_Specs\DocsiteExamples -apiSpecGitUrl
) else (
rem === BUILDING DocsiteExamples with params %* ===
node generate.js DocsiteExamples=..\API_Specs\DocsiteExamples %*
)
popd
