jshint-mode
=======

Integrate [JSHint](http://jshint.com) into Emacs via a [node.js](http://nodejs.org) server.

![example](https://github.com/daleharvey/jshint-mode/raw/master/example.png)

jshint-mode was heavily inspired by Kevin Turners [lintnode](https://github.com/keturn/lintnode).

Modified version of daleharvey/jshint-mode to utilize ~/.jshintrc and cwd()/.jshintrc options for jshint as the original cli did

Building
========

Install via [npm](http://npmjs.org/)

    $ npm install jshint-mode

or you can [download](https://github.com/jeffbski/jshint-mode/tarball/master) or clone

    $ git clone git://github.com/jeffbski/jshint-mode.git

Usage
=====

Add the configuration to your .emacs config file:

    $jshint-emacs-path >> ~/.emacs

or if you downloaded manually:

    (add-to-list 'load-path "~/path/to/jshint-mode")
    (require 'flymake-jshint)
    (add-hook 'javascript-mode-hook
         (lambda () (flymake-mode t)))

You can use M-x flymake-mode to turn flymake of and on, if you want to turn it on be fault, add the following to your .emacs

    ;; Turns on flymake for all files which have a flymake mode
    (add-hook 'find-file-hook 'flymake-find-file-hook)


Status
======

 - 2012-01-06 - change to support node 0.6, process.ARGV should be process.argv