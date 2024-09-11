collectEnvironment() {
  if [ -z "$ENVIRONMENT_CODE" ]; then
    echo -n "1). Enter Environment Code (dev, uat, prod-fc): "
    read ENVIRONMENT_CODE
  else
    echo "Environment Code is already set to $ENVIRONMENT_CODE"
  fi
}

while true; do
  collectEnvironment

  export ENVIRONMENT_CODE=$(echo $ENVIRONMENT_CODE)
  break
done

rm -rf dist
npm run build-lambda

rm -rf cdk.out/* && \
npm run build

if [ "$IS_PIPELINE" -eq 1 ]; then
  cdk deploy --require-approval=never
else
  npx cdk deploy
fi

echo "Finished at $(date +"%T")"

# npm run deploy