<?php

namespace App\Tests\Functional\Security;

use App\DataFixtures\UserFixtures;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class LoginFormAuthenticatorTest extends WebTestCase
{
    /**
     * @test
     */
    public function shouldRedirectAfterSuccessLoginProcess()
    {
        $client = static::createClient();

        $userRepository = static::$container->get(UserRepository::class);
        $user = $userRepository->findUserByUsername(UserFixtures::USERNAME);

        $crawler = $client->request('GET', '/login');
        $this->assertResponseIsSuccessful();
        $this->assertSelectorTextContains('h1', 'Login');

        $form = $crawler->selectButton('Sign in')->form();
        $form['username']->setValue($user->getUsername());
        $form['password']->setValue(UserFixtures::PASSWORD);

        $client->submit($form);
        $this->assertResponseRedirects('/admin', 302);
    }

    /**
     * @test
     */
    public function shouldDisplayInformationIfAuthenticationFailed()
    {
        $client = static::createClient();

        $userRepository = static::$container->get(UserRepository::class);
        $user = $userRepository->findUserByUsername(UserFixtures::USERNAME);

        $crawler = $client->request('GET', '/login');
        $this->assertResponseIsSuccessful();
        $this->assertSelectorTextContains('h1', 'Login');

        $form = $crawler->selectButton('Sign in')->form();
        $form['username']->setValue($user->getUsername());
        $form['password']->setValue('wrongPassword');

        $client->submit($form);
        $this->assertResponseRedirects('/login', 302);
        $client->request('GET', '/login');
        $this->assertSelectorTextContains('div.alert', 'Invalid credentials.');
    }
}
