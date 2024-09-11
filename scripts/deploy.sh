echo "Start at $(date +"%T")"

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

ROOT=$(pwd)

cd app
npm install
npm run build
npm prune --production

cd $ROOT
cd infra
npm install
npm run build

npx cdk deploy

echo "Finished at $(date +"%T")"
