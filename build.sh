# Build news-client
echo "Building News Client"
cd news-client/
npm install
npm run build

# Build news-server
echo "Building News Server"
cd ../news-server/
npm install --prod

# Bundle client code into news-server
echo "Bundling client code into news-server"
mkdir -p public
cp -r ../news-client/build public/