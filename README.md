#Plugin - PhpWatch#

##About##
A Brackets IDE extension which watches a php log and outputs log entries to a brackets panel. The extension uses Node.js's Tail command to monitoring, see : git://github.com/lucagrulla/node-tail.git. The panel is set to pop-up by default when there is a new entry.


##Preferences##
Preferences are stored in the brackets.json file as default settings.

* **ShowOnChange** determines whether the PhPWatch window appears when changes happen to the file.
* **LogFilePath** is the path of the file to watch.
* **ReverseOutput** Prints error log entries in reverse.

**Example:**

	 "PhpWatch.ShowOnChange": true,
	 "PhpWatch.LogFilePath": "C:/wamp/logs/php_error.log"
	 "PhpWatch.ReverseOutput": false

##Contributing##
Contributions are welcome.
