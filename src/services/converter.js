import fs from 'fs';
import xml2js from 'xml2js';
import { create } from 'xmlbuilder';

export const convertJsonToXml = (jsonFile, outPath) => {
  const data = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));
  const xml = create('root').ele(data).end({ pretty: true });
  fs.writeFileSync(outPath, xml);
};

export const convertXmlToJson = async (xmlFile, outPath) => {
  const data = fs.readFileSync(xmlFile, 'utf-8');
  const parser = new xml2js.Parser({ explicitArray: false });
  const result = await parser.parseStringPromise(data);
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2));
};
