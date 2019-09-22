<?php


namespace App\Core;


class BaseView
{
    protected $pageTitle = '';
    private $tagLink = '';
    private $tagScript = '';

    public function addCSS($files)
    {
        $files = (array) $files;
        foreach ($files as $file)
        {
            $this->tagLink .= '<link type="text/css" rel="stylesheet" href="' . URL_BASE_PUBLIC . $file . '" />' . "\n";
        }
    }

    public function getCSS()
    {
        return $this->tagLink;
    }

    public function addJS($files)
    {
        $files = (array) $files;
        foreach ($files as $file)
        {
            $this->tagScript .= '<script type="text/javascript" src="' . URL_BASE_PUBLIC . $file . '"></script>' . "\n";
        }
    }

    public function getJS()
    {
        return $this->tagLink;
    }


    /**
     * Get File: Requires in a view file if it exists.
     * @param string $filepath
     * @return void
     */
    public function getFile($filepath) {
        if (file_exists('../app/Views/' . $filepath . '.php'))
        {
            require_once '../app/Views/' . $filepath . '.php';
        }
    }

    public function render($filePath, array $data = [])
    {
        $this->addData($data);
        $this->getFile('templates/header');
        $this->getFile($filePath);
        $this->getFile('templates/footer');
    }

    /**
     * Add Data: Loops through an array of data, setting the key and value as
     * class properties so that it can be accessed in the views HTML.
     * @param array $data
     * @return void
     */
    public function addData(array $data) {
        foreach ($data as $key => $value) {
            $this->{$key} = $value;
        }
    }
}