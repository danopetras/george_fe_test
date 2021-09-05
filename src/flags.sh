css_file=Styles/flags.css
flags_dir=assets/flags/*.png
regex=".*([a-z]{2})\.png"

echo "generate css classes from flag images"
echo "---------------------------------------------";

if test -f $css_file
then
	echo "file $css_file already exists"
	read -p "do you wont to overwrite it? [y/n] : " should_overwrite

	if [[ $should_overwrite != 'y' ]]
	then
		echo 'quiting script'
		exit 0
	else
		rm $css_file
	fi
fi

echo "/* generated with flags.sh script*/" > $css_file
count_of_files=0
for FILE in $flags_dir
do
	if [[ $FILE =~ $regex ]]
	then
		name="${BASH_REMATCH[1]}"
		mimetype=$(file -bN --mime-type $FILE)
		content=$(base64 -w0 < $FILE)
		echo ".Flag.flag-$name { background-image: url('data:$mimetype;base64,$content'); }" >> $css_file
		((count_of_files=count_of_files + 1))
	fi
done

if ((count_of_files > 0))
then
	echo "embeded $count_of_files files."
	echo "file $css_file successfully generated.."
else
	echo "no files has been found"
fi
