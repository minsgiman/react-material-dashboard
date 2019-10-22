# Python으로 Model별 config.json 빌드

***

### 각 Model마다 관리하는 JSON 포맷이 달라지지 않도록 중앙에서 Control 하기 위하여 구현하였다.

 - JSON file을 읽는다.
 - Config List에 있는 내용이 빠져 있다면, default value로 추가해준다.
 - Config List에 없는 내용이 있다면, 제거된다.

        #!/usr/bin/python
        
        # $ ./config_builder.py
        #
        
        import subprocess
        import argparse
        import re
        import os, sys
        import json
        
        BASEURL = "./"
        FILENAME = "config.json"
        
        
        #*************** Model List ********************
        #********* value : "ModelName" *****************
        #***********************************************
        modelList = ["model1", "model2", "model3"]   
        
        
        #*************** Config List *******************
        #**** value : (Config name, Default value) *****
        #***********************************************
        configList = [
        			('CONFIG_1', 'Name'),
        			('CONFIG_2', 'false'),						
        			('CONFIG_3', 'true'),
        			('CONFIG_4', 2),        			
        		   ]
        
        
        def readConfig(filePath):
        	file = open(filePath, "r");
        	jsonConfig = json.loads(file.read())
        	file.close()
        	return jsonConfig
        
        def writeConfig(file, configName, value, isLastConfig) :
        	if isLastConfig == True:
        		lastword = '\n'
        	else:
        		lastword = ',\n'
        
        	if type(value) is str:
        		if value == 'true' or value == 'True' or value == 'TRUE':
        			file.write('\t\"{0}\" : true'.format(configName) + lastword)
        		elif value == 'false' or value == 'False' or value == 'FALSE':
        			file.write('\t\"{0}\" : false'.format(configName) + lastword)
        		else:
        			file.write('\t\"{0}\" : \"{1}\"'.format(configName, value) + lastword)
        	elif type(value) is bool:
        		if value == True:
        			file.write('\t\"{0}\" : true'.format(configName) + lastword)
        		else:
        			file.write('\t\"{0}\" : false'.format(configName) + lastword)
        	elif type(value) is int:
        		file.write('\t\"{0}\" : {1}'.format(configName, value) + lastword)
        	else:
        		file.write('\t\"{0}\" : \"{1}\"'.format(configName, value) + lastword)
        
        try:
        	for modelName in modelList:
        		configPath = BASEURL + modelName + "/" + FILENAME;
        		jsonConfig = readConfig(configPath);
        		file = open(configPath, "w");
        		file.write('{\n')
        
        		for (configName, defaultValue) in configList:
        			if configList.index((configName, defaultValue)) == len(configList)-1 :
        				isLastConfig = True
        			else :
        				isLastConfig = False
        			if configName in jsonConfig:
        				writeConfig(file, configName, jsonConfig[configName], isLastConfig)
        			else :
        				writeConfig(file, configName, defaultValue, isLastConfig)
        
        		file.write('}')
        		file.close()
        		print "!! configPath({0}) has been built".format(configPath)
        
        except subprocess.CalledProcessError as e:
        	print "failed to process, error: {0}".format(e.output),
